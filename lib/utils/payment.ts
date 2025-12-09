// Payment Utility Functions
import { PaymentConfig, PaymentProvider, PaymentMethod } from '@/lib/types/payment';
import { createStripeIntegration } from '@/lib/integrations/stripe';
import { createVippsIntegration } from '@/lib/integrations/vipps';
import { createKlarnaIntegration } from '@/lib/integrations/klarna';

/**
 * Get available payment methods
 */
export function getAvailablePaymentMethods(config: PaymentConfig): PaymentMethod[] {
  const methods: PaymentMethod[] = [];

  if (config.stripe?.publicKey) {
    methods.push({
      id: 'stripe',
      provider: 'stripe',
      name: 'Kort',
      description: 'Betal med Visa, Mastercard eller American Express',
      enabled: true,
      testMode: config.stripe.testMode,
    });
  }

  if (config.vipps?.clientId) {
    methods.push({
      id: 'vipps',
      provider: 'vipps',
      name: 'Vipps',
      description: 'Betal enkelt med Vipps',
      enabled: true,
      testMode: config.vipps.testMode,
      logo: '/images/vipps-logo.svg',
    });
  }

  if (config.klarna?.username) {
    methods.push({
      id: 'klarna',
      provider: 'klarna',
      name: 'Klarna',
      description: 'Betal senere eller del opp betalingen',
      enabled: true,
      testMode: config.klarna.testMode,
      logo: '/images/klarna-logo.svg',
    });
  }

  return methods;
}

/**
 * Get payment integration instance
 */
export function getPaymentIntegration(provider: PaymentProvider, config: PaymentConfig) {
  switch (provider) {
    case 'stripe':
      if (!config.stripe) throw new Error('Stripe configuration missing');
      return createStripeIntegration(config.stripe);
    
    case 'vipps':
      if (!config.vipps) throw new Error('Vipps configuration missing');
      return createVippsIntegration(config.vipps);
    
    case 'klarna':
      if (!config.klarna) throw new Error('Klarna configuration missing');
      return createKlarnaIntegration(config.klarna);
    
    default:
      throw new Error(`Unsupported payment provider: ${provider}`);
  }
}

/**
 * Format amount for display (NOK)
 */
export function formatPaymentAmount(amount: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
  }).format(amount);
}

/**
 * Convert amount to smallest unit (øre for NOK)
 */
export function toSmallestUnit(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convert from smallest unit (øre) to main unit (NOK)
 */
export function fromSmallestUnit(amount: number): number {
  return amount / 100;
}

/**
 * Validate payment configuration
 */
export function validatePaymentConfig(config: PaymentConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate Stripe
  if (config.stripe) {
    if (!config.stripe.publicKey) errors.push('Stripe public key is required');
    if (!config.stripe.secretKey) errors.push('Stripe secret key is required');
  }

  // Validate Vipps
  if (config.vipps) {
    if (!config.vipps.clientId) errors.push('Vipps client ID is required');
    if (!config.vipps.clientSecret) errors.push('Vipps client secret is required');
    if (!config.vipps.merchantSerialNumber) errors.push('Vipps merchant serial number is required');
  }

  // Validate Klarna
  if (config.klarna) {
    if (!config.klarna.username) errors.push('Klarna username is required');
    if (!config.klarna.password) errors.push('Klarna password is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
