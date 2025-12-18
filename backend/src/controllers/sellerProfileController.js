import Seller from "../models/Seller.js";

// GET seller profile
export const getSellerProfile = async (req, res) => {
    try {
        const sellerId = req.user._id;

        const seller = await Seller.findById(sellerId).select('-password');

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        res.json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE seller profile
export const updateSellerProfile = async (req, res) => {
    try {
        const sellerId = req.user._id;
        const {
            name,
            email,
            phone,
            businessName,
            businessType,
            businessAddress
        } = req.body;

        // Check if email is being changed and if it's already taken
        if (email) {
            const existingSeller = await Seller.findOne({
                email,
                _id: { $ne: sellerId }
            });

            if (existingSeller) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        // Check if phone is being changed and if it's already taken
        if (phone) {
            const existingSeller = await Seller.findOne({
                phone,
                _id: { $ne: sellerId }
            });

            if (existingSeller) {
                return res.status(400).json({ message: "Phone number already in use" });
            }
        }

        const updatedSeller = await Seller.findByIdAndUpdate(
            sellerId,
            {
                name,
                email,
                phone,
                businessName,
                businessType,
                businessAddress
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedSeller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        res.json({
            message: "Profile updated successfully",
            seller: updatedSeller
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
