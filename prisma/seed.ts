import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  
  try {
    console.log('Starting seed...');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@laserpresisjon.no';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = await hash(adminPassword, 10);

    const admin = await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        passwordHash,
        name: 'Admin',
      },
    });

    console.log('Admin user created:', admin.email);

    // Create some default settings
    const defaultSettings = [
      { key: 'company_name', value: 'Laser Presisjon AS', category: 'general' },
      { key: 'company_email', value: 'post@laserpresisjon.no', category: 'general' },
      { key: 'company_phone', value: '+47 123 45 678', category: 'general' },
      { key: 'free_shipping_threshold', value: '500', category: 'shipping' },
      { key: 'low_stock_threshold', value: '5', category: 'inventory' },
      { key: 'stripe_test_mode', value: 'true', category: 'payment' },
      { key: 'email_notifications_enabled', value: 'true', category: 'email' },
      { key: 'ga_tracking_id', value: '', category: 'seo' },
    ];

    for (const setting of defaultSettings) {
      await prisma.settings.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting,
      });
    }

    console.log('Default settings created');

    // Migrate existing products to database
    const existingProducts = [
      {
        name: 'Personlig Navneskilt',
        slug: 'personlig-navneskilt',
        description: 'Elegant navneskilt i tre med lasergravering. Perfekt til kontoret eller hjemmet.',
        price: 299,
        sku: 'NS-001',
        category: 'Navneskilt',
        featured: true,
        seoTitle: 'Personlig Navneskilt med Lasergravering | Laser Presisjon',
        seoDescription: 'Bestill ditt eget personlige navneskilt i tre med lasergravering. Høy kvalitet og rask levering.',
      },
      {
        name: 'Graverte Nøkkelringer',
        slug: 'graverte-nokkelringer',
        description: 'Praktisk nøkkelring i metall eller tre med din egen tekst eller logo.',
        price: 149,
        sku: 'NK-001',
        category: 'Tilbehør',
        featured: true,
        seoTitle: 'Graverte Nøkkelringer med Lasergravering | Laser Presisjon',
        seoDescription: 'Personlige nøkkelringer med lasergravering. Perfekt som gave eller merch.',
      },
      {
        name: 'Julebrett i Tre',
        slug: 'julebrett-i-tre',
        description: 'Vakkert julebrett med lasergraverte motiver. Perfekt til høytiden.',
        price: 599,
        sku: 'JB-001',
        category: 'Høytid',
        featured: true,
        seoTitle: 'Graverte Julebrett i Tre | Laser Presisjon',
        seoDescription: 'Nydelige julebrett med lasergravering. Legg til julestemning i hjemmet ditt.',
      },
    ];

    for (const product of existingProducts) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      });
    }

    console.log('Sample products created');

    console.log('Seed completed!');
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  });
