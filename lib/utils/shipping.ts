// Shipping Utility Functions
import { ShippingConfig, ShippingCarrier, ShippingRate, ShippingMethod } from '@/lib/types/shipping';
import { createBringIntegration } from '@/lib/integrations/bring';
import { createPostenIntegration } from '@/lib/integrations/posten';
import { createHelthjemIntegration } from '@/lib/integrations/helthjem';

/**
 * Get available shipping methods
 */
export function getAvailableShippingMethods(config: ShippingConfig): ShippingMethod[] {
  const methods: ShippingMethod[] = [];

  // Always include store pickup
  methods.push({
    id: 'store_pickup',
    carrier: 'pickup',
    name: 'Hent i butikk',
    description: 'Hent selv i vår butikk - gratis',
    price: 0,
    estimatedDays: 0,
    enabled: true,
  });

  if (config.bring?.apiKey) {
    methods.push(
      {
        id: 'bring_mailbox',
        carrier: 'bring',
        name: 'Bring - Pakke i postkassen',
        description: 'Levering i postkassen din',
        price: 89,
        estimatedDays: 3,
        enabled: true,
      },
      {
        id: 'bring_pickup',
        carrier: 'bring',
        name: 'Bring - Pakke til hentested',
        description: 'Hent på nærmeste hentested',
        price: 99,
        estimatedDays: 2,
        enabled: true,
      },
      {
        id: 'bring_home',
        carrier: 'bring',
        name: 'Bring - Hjemlevering',
        description: 'Levering hjem til deg',
        price: 149,
        estimatedDays: 2,
        enabled: true,
      }
    );
  }

  if (config.posten?.apiKey) {
    methods.push(
      {
        id: 'posten_a',
        carrier: 'posten',
        name: 'Posten - A-prioritert',
        description: 'Rask levering',
        price: 79,
        estimatedDays: 2,
        enabled: true,
      },
      {
        id: 'posten_b',
        carrier: 'posten',
        name: 'Posten - B-økonomi',
        description: 'Rimelig levering',
        price: 59,
        estimatedDays: 4,
        enabled: true,
      }
    );
  }

  if (config.helthjem?.apiKey) {
    methods.push(
      {
        id: 'helthjem_day',
        carrier: 'helthjem',
        name: 'Helthjem - Hjemlevering dag',
        description: 'Levering på dagtid (09:00-17:00)',
        price: 129,
        estimatedDays: 2,
        enabled: true,
      },
      {
        id: 'helthjem_evening',
        carrier: 'helthjem',
        name: 'Helthjem - Hjemlevering kveld',
        description: 'Levering på kveldstid (17:00-21:00)',
        price: 159,
        estimatedDays: 2,
        enabled: true,
      }
    );
  }

  return methods;
}

/**
 * Get shipping integration instance
 */
export function getShippingIntegration(carrier: ShippingCarrier, config: ShippingConfig) {
  switch (carrier) {
    case 'bring':
      if (!config.bring) throw new Error('Bring configuration missing');
      return createBringIntegration(config.bring);
    
    case 'posten':
      if (!config.posten) throw new Error('Posten configuration missing');
      return createPostenIntegration(config.posten);
    
    case 'helthjem':
      if (!config.helthjem) throw new Error('Helthjem configuration missing');
      return createHelthjemIntegration(config.helthjem);
    
    case 'pickup':
      return null; // No integration needed for store pickup
    
    default:
      throw new Error(`Unsupported shipping carrier: ${carrier}`);
  }
}

/**
 * Calculate shipping cost with free shipping threshold
 */
export function calculateShippingCost(
  basePrice: number,
  cartTotal: number,
  config: ShippingConfig
): number {
  if (cartTotal >= config.freeShippingThreshold) {
    return 0;
  }
  return basePrice;
}

/**
 * Estimate delivery date
 */
export function estimateDeliveryDate(days: number): Date {
  const date = new Date();
  let addedDays = 0;
  
  while (addedDays < days) {
    date.setDate(date.getDate() + 1);
    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      addedDays++;
    }
  }
  
  return date;
}

/**
 * Format delivery date range
 */
export function formatDeliveryDateRange(days: number): string {
  if (days === 0) {
    return 'Klar for henting i dag';
  }
  
  const startDate = estimateDeliveryDate(Math.max(1, days - 1));
  const endDate = estimateDeliveryDate(days + 1);
  
  const formatter = new Intl.DateTimeFormat('nb-NO', {
    day: 'numeric',
    month: 'short',
  });
  
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}

/**
 * Validate shipping configuration
 */
export function validateShippingConfig(config: ShippingConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate Bring
  if (config.bring) {
    if (!config.bring.apiKey) errors.push('Bring API key is required');
    if (!config.bring.customerId) errors.push('Bring customer ID is required');
  }

  // Validate Posten
  if (config.posten) {
    if (!config.posten.apiKey) errors.push('Posten API key is required');
    if (!config.posten.customerId) errors.push('Posten customer ID is required');
  }

  // Validate Helthjem
  if (config.helthjem) {
    if (!config.helthjem.apiKey) errors.push('Helthjem API key is required');
    if (!config.helthjem.customerId) errors.push('Helthjem customer ID is required');
  }

  // Validate default packaging
  if (!config.defaultPackaging) {
    errors.push('Default packaging dimensions are required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate package weight (with padding)
 */
export function calculatePackageWeight(items: { weight: number }[]): number {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  // Add 100g for packaging materials
  return totalWeight + 100;
}
