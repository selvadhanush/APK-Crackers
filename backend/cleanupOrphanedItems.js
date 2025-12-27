import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cart from './src/models/Cart.js';
import Wishlist from './src/models/Wishlist.js';
import Product from './src/models/Product.js';

dotenv.config();

const cleanupOrphanedItems = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Get all valid product IDs
        const validProductIds = (await Product.find({}).select('_id')).map(p => p._id.toString());
        console.log(`📦 Found ${validProductIds.length} valid products`);

        // Clean up Cart items with invalid/deleted productId
        const carts = await Cart.find({});
        let totalCartItemsRemoved = 0;

        for (const cart of carts) {
            const originalLength = cart.items.length;
            cart.items = cart.items.filter(item =>
                validProductIds.includes(item.productId.toString())
            );

            if (cart.items.length !== originalLength) {
                await cart.save();
                const removed = originalLength - cart.items.length;
                totalCartItemsRemoved += removed;
                console.log(`🧹 Removed ${removed} orphaned items from cart ${cart._id}`);
            }
        }

        // Clean up Wishlist items with invalid/deleted productId
        const wishlists = await Wishlist.find({});
        const orphanedWishlistIds = wishlists
            .filter(item => !validProductIds.includes(item.productId.toString()))
            .map(item => item._id);

        if (orphanedWishlistIds.length > 0) {
            await Wishlist.deleteMany({ _id: { $in: orphanedWishlistIds } });
            console.log(`🧹 Removed ${orphanedWishlistIds.length} orphaned wishlist items`);
        }

        console.log('\n✨ Cleanup Summary:');
        console.log(`   Cart items removed: ${totalCartItemsRemoved}`);
        console.log(`   Wishlist items removed: ${orphanedWishlistIds.length}`);
        console.log('✅ Cleanup completed successfully!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
};

cleanupOrphanedItems();
