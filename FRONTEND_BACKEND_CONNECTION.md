# Frontend-Backend Connection Analysis

## 🔧 **CRITICAL FIX APPLIED**

### Port Configuration Issue
**Problem**: Frontend was configured to connect to port `8000`, but backend runs on port `5000`

**Fixed**: Changed [`api.js`](file:///home/laser/APK_Crackers/frontend/api.js) baseURL from:
```javascript
baseURL: "http://localhost:8000/api"  // ❌ WRONG
```
to:
```javascript
baseURL: "http://localhost:5000/api"  // ✅ CORRECT
```

---

## 📊 Configuration Summary

### Backend Configuration
- **Port**: `5000` (from `.env` file)
- **CORS Allowed Origins**: 
  - `http://localhost:5173` ✅ (Vite dev server)
  - `https://yourfrontend.com`
- **Base Path**: `/api`

### Frontend Configuration
- **Dev Server Port**: `5173` (Vite default)
- **API Base URL**: `http://localhost:5000/api` ✅ **FIXED**
- **Auth Method**: JWT Bearer token (stored in localStorage)

---

## 🔗 API Endpoint Mapping

### Frontend → Backend Endpoint Usage

#### **Customer Endpoints** (6 components)

| Component | Endpoint | Backend Route | Status |
|-----------|----------|---------------|--------|
| `Register.jsx` | `POST /customer/auth/register` | ✅ Exists | Working |
| `Login.jsx` | `POST /customer/auth/login` | ✅ Exists | Working |
| `Products.jsx` | `GET /products/customer` | ✅ Exists (at `/`) | Working |
| `Prouductview.jsx` | `GET /products/customer/product/:id` | ⚠️ Check route | Needs verification |
| `Cart.jsx` | `GET /cart` | ✅ Exists | Working |
| `Cart.jsx` | `PUT /cart/update` | ⚠️ Not found | **MISSING** |
| `Cart.jsx` | `DELETE /cart/remove/:productId` | ✅ Exists | Working |
| `Payment.jsx` | `POST /orders/create` | ✅ Exists | Working |
| `Payment.jsx` | `POST /payment/order` | ⚠️ Check route | Should be `/payment/create` |
| `Payment.jsx` | `POST /payment/verify` | ✅ Exists | Working |
| `Payment.jsx` | `POST /payment/failed` | ✅ Exists | Working |

#### **Seller Endpoints** (7 components)

| Component | Endpoint | Backend Route | Status |
|-----------|----------|---------------|--------|
| `SellerRegister.jsx` | `POST /seller/auth/register` | ⚠️ Route is `/signup` | **MISMATCH** |
| `SellerLogin.jsx` | `POST /seller/auth/login` | ✅ Exists | Working |
| `KycVerify.jsx` | `POST /seller/kyc/upload` | ✅ Exists | Working |
| `ProductForm.jsx` | `POST /products/add` | ✅ Exists | Working |
| `Myproducts.jsx` | `GET /products/my-products` | ✅ Exists | Working |
| `SellerOrders.jsx` | `GET /seller/orders` | ✅ Exists | Working |
| `Sellerdashboard.jsx` | `GET /seller/analytics/dashboard` | ✅ Exists | Working |

#### **Admin Endpoints** (5 components)

| Component | Endpoint | Backend Route | Status |
|-----------|----------|---------------|--------|
| `Adminlogin.jsx` | `POST /admin/auth/login` | ✅ Exists | Working |
| `Adminhome.jsx` | `GET /admin/analytics/dashboard` | ✅ Exists | Working |
| `Adminhome.jsx` | `GET /admin/products/pending` | ✅ Exists | Working |
| `Adminhome.jsx` | `GET /admin/products/count` | ⚠️ Not found | **MISSING** |
| `Adminhome.jsx` | `GET /admin/kyc/pending` | ✅ Exists | Working |
| `Adminkyc.jsx` | `PUT /admin/kyc/review/:kycId` | ✅ Exists | Working |
| `Adminapproval.jsx` | `PUT /admin/products/approve/:productId` | ✅ Exists | Working |
| `Adminapproval.jsx` | `PUT /admin/products/reject/:productId` | ✅ Exists | Working |
| `Adminorders.jsx` | `GET /admin/orders` | ✅ Exists | Working |
| `Adminorders.jsx` | `PUT /admin/orders/update/:orderId` | ⚠️ Check route | Needs verification |

---

## ⚠️ Issues Found

### 1. **Seller Registration Endpoint Mismatch** 🔴
**Frontend**: `POST /seller/auth/register`  
**Backend**: `POST /seller/auth/signup`  
**Fix Required**: Update frontend or backend to match

### 2. **Missing Cart Update Endpoint** 🔴
**Frontend**: `PUT /cart/update`  
**Backend**: Not implemented  
**Fix Required**: Add cart update endpoint to backend

### 3. **Payment Order Endpoint Mismatch** 🟡
**Frontend**: `POST /payment/order`  
**Backend**: `POST /payment/create`  
**Fix Required**: Update frontend to use `/payment/create`

### 4. **Missing Admin Products Count** 🟡
**Frontend**: `GET /admin/products/count`  
**Backend**: Not implemented  
**Fix Required**: Add endpoint or remove from frontend

### 5. **Product View Endpoint** 🟡
**Frontend**: `GET /products/customer/product/:id`  
**Backend**: Should be `GET /products/customer/:productId`  
**Fix Required**: Verify route structure

---

## ✅ Recommendations

### Immediate Fixes (Critical)

1. **Fix Seller Registration Route**
   ```javascript
   // In SellerRegister.jsx, change:
   await API.post('/seller/auth/register', ...)
   // to:
   await API.post('/seller/auth/signup', ...)
   ```

2. **Fix Payment Create Endpoint**
   ```javascript
   // In Payment.jsx, change:
   await API.post('/payment/order', ...)
   // to:
   await API.post('/payment/create', ...)
   ```

3. **Add Cart Update Endpoint** (Backend)
   ```javascript
   // In cartController.js
   export const updateCart = async (req, res) => {
     // Implementation needed
   };
   ```

### Testing Checklist

- [ ] Test customer registration and login
- [ ] Test product browsing and viewing
- [ ] Test cart operations (add, update, remove)
- [ ] Test checkout and payment flow
- [ ] Test seller registration and login
- [ ] Test seller KYC upload
- [ ] Test seller product management
- [ ] Test admin login and dashboard
- [ ] Test admin product approval
- [ ] Test admin KYC approval

---

## 🎯 Current Status

**Port Configuration**: ✅ **FIXED**  
**CORS Configuration**: ✅ Working (allows localhost:5173)  
**Auth System**: ✅ Working (JWT with interceptors)  
**Endpoint Matches**: ⚠️ 4 mismatches found  

**Next Steps**: Fix the 4 endpoint mismatches listed above
