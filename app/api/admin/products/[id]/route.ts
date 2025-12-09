import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        variants: true,
        inventory: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PATCH update product (partial update)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Convert numeric fields
    if (body.price) body.price = parseFloat(body.price);
    if (body.salePrice) body.salePrice = parseFloat(body.salePrice);

    const product = await prisma.product.update({
      where: { id: params.id },
      data: body,
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
          action: 'UPDATE',
          entity: 'Product',
          entityId: product.id,
          details: `Updated product: ${product.name}`,
        },
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    // Log activity
    if (session.user?.id) {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.user.id,
          action: 'DELETE',
          entity: 'Product',
          entityId: params.id,
          details: `Deleted product: ${product.name}`,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

// PUT full product update
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Delete existing images and variants
    await prisma.productImage.deleteMany({
      where: { productId: params.id },
    });
    await prisma.productVariant.deleteMany({
      where: { productId: params.id },
    });

    // Update product with new data
    const product = await prisma.product.update({
      where: { id: params.id },
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
          action: 'UPDATE',
          entity: 'Product',
          entityId: product.id,
          details: `Updated product: ${product.name}`,
        },
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
