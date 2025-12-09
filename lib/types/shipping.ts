// Shipping Types and Interfaces

export type ShippingCarrier = 'bring' | 'posten' | 'helthjem' | 'pickup';

export type ShippingStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed'
  | 'returned';

export interface ShippingMethod {
  id: string;
  carrier: ShippingCarrier;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  enabled: boolean;
}

export interface BringConfig {
  apiKey: string;
  customerId: string;
  testMode: boolean;
}

export interface PostenConfig {
  apiKey: string;
  customerId: string;
  testMode: boolean;
}

export interface HelthjemConfig {
  apiKey: string;
  customerId: string;
  testMode: boolean;
}

export interface ShippingConfig {
  bring?: BringConfig;
  posten?: PostenConfig;
  helthjem?: HelthjemConfig;
  freeShippingThreshold: number;
  defaultPackaging: {
    weight: number; // grams
    width: number; // cm
    height: number; // cm
    length: number; // cm
  };
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  openingHours: string;
  carrier: ShippingCarrier;
  distance?: number; // km
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ShippingRate {
  carrier: ShippingCarrier;
  service: string;
  price: number;
  estimatedDelivery: string;
  pickupPoints?: PickupPoint[];
}

export interface ShippingLabel {
  id: string;
  trackingNumber: string;
  carrier: ShippingCarrier;
  labelUrl: string;
  createdAt: Date;
}

export interface Shipment {
  id: string;
  orderId: string;
  carrier: ShippingCarrier;
  service: string;
  trackingNumber: string;
  status: ShippingStatus;
  shippingAddress: Address;
  pickupPoint?: PickupPoint;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrackingEvent {
  timestamp: Date;
  status: string;
  location: string;
  description: string;
}

export interface TrackingInfo {
  trackingNumber: string;
  carrier: ShippingCarrier;
  status: ShippingStatus;
  events: TrackingEvent[];
  estimatedDelivery?: Date;
}
