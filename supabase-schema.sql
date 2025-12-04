-- Table pour tracker les clics d'affiliation
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  external_link TEXT NOT NULL,
  affiliate_id TEXT DEFAULT 'lionsmax-site',
  utm_source TEXT DEFAULT 'lionsmax',
  utm_medium TEXT DEFAULT 'affiliate',
  utm_campaign TEXT DEFAULT 'product-click',
  commission_percentage DECIMAL(5,2) DEFAULT 5.00,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour tracker les conversions/commissions
CREATE TABLE IF NOT EXISTS affiliate_conversions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  click_id UUID REFERENCES affiliate_clicks(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  order_id TEXT,
  order_amount DECIMAL(10,2),
  commission_amount DECIMAL(10,2),
  commission_percentage DECIMAL(5,2) DEFAULT 5.00,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'rejected')),
  converted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table utilisateurs (si elle n'existe pas déjà)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_product ON affiliate_clicks(product_name);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_date ON affiliate_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_affiliate ON affiliate_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_status ON affiliate_conversions(status);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_date ON affiliate_conversions(converted_at DESC);

-- Vue pour statistiques agrégées
CREATE OR REPLACE VIEW affiliate_stats AS
SELECT 
  DATE_TRUNC('day', clicked_at) as date,
  affiliate_id,
  product_name,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT ip_address) as unique_clicks,
  COALESCE(SUM(ac.commission_amount), 0) as total_commissions
FROM affiliate_clicks ac
LEFT JOIN affiliate_conversions conv ON ac.id = conv.click_id
GROUP BY DATE_TRUNC('day', clicked_at), affiliate_id, product_name
ORDER BY date DESC;

-- Commentaires pour documentation
COMMENT ON TABLE affiliate_clicks IS 'Stocke tous les clics sur les liens d''affiliation';
COMMENT ON TABLE affiliate_conversions IS 'Stocke les conversions et commissions générées';
COMMENT ON TABLE users IS 'Utilisateurs du site LionsMax';
COMMENT ON VIEW affiliate_stats IS 'Vue agrégée des statistiques d''affiliation par jour';
