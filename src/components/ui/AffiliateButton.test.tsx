import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AffiliateButton } from './AffiliateButton';

describe('AffiliateButton', () => {
    it('renders correctly', () => {
        render(
            <AffiliateButton
                productName="Test Product"
                externalLink="https://example.com"
            >
                Buy Now
            </AffiliateButton>
        );
        expect(screen.getByText('Buy Now')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(
            <AffiliateButton
                productName="Test Product"
                externalLink="https://example.com"
                onClick={handleClick}
            >
                Buy Now
            </AffiliateButton>
        );

        fireEvent.click(screen.getByText('Buy Now'));
        expect(handleClick).toHaveBeenCalled();
    });
});
