import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all products
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        variants: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      salePrice,
      sku,
      category,
      images,
      variants,
      inStock,
      featured,
      visibility,
      seoTitle,
      seoDescription,
      relatedProducts,
    } = body;

    // Create product with related data
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        sku,
        category,
        inStock: inStock ?? true,
        featured: featured ?? false,
        visibility: visibility || 'published',
        seoTitle,
        seoDescription,
        relatedProducts: relatedProducts ? JSON.stringify(relatedProducts) : null,
        images: images?.length
          ? {
              create: images.map((img: { url: string; alt?: string }, index: number) => ({
                url: img.url,
                alt: img.alt || name,
                order: index,
              })),
            }
          : undefined,
        variants: variants?.length
          ? {
              create: variants.map((v: { name: string; type: string; options: string[]; priceModifier?: number | string }) => ({
                name: v.name,
                type: v.type,
                options: JSON.stringify(v.options),
                priceModifier: v.priceModifier ? (typeof v.priceModifier === 'string' ? parseFloat(v.priceModifier) : v.priceModifier) : null,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        variants: true,
      },
    });

    // Log activity
    if (session.user?.id) {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.user.id,
          action: 'CREATE',
          entity: 'Product',
          entityId: product.id,
          details: `Created product: ${product.name}`,
        },
      });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
