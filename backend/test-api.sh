#!/bin/bash

# 🔥 Crackers Marketplace API Testing Script
# Base URL
BASE_URL="http://localhost:5000"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to print test results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASSED${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC}: $2"
        ((FAILED++))
    fi
}

echo "=========================================="
echo "🔥 CRACKERS MARKETPLACE API TESTS"
echo "=========================================="
echo ""

# =========================
# 1️⃣ TEST SERVER HEALTH
# =========================
echo "1️⃣ Testing Server Health..."
response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/)
if [ "$response" -eq 200 ]; then
    print_result 0 "Server is running"
else
    print_result 1 "Server health check (got $response)"
fi
echo ""

# =========================
# 2️⃣ ADMIN AUTHENTICATION
# =========================
echo "2️⃣ Testing Admin Authentication..."
ADMIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }')

ADMIN_TOKEN=$(echo $ADMIN_RESPONSE | grep -o '"token":"[^"]*' | sed 's/"token":"//')

if [ ! -z "$ADMIN_TOKEN" ]; then
    print_result 0 "Admin login successful"
else
    print_result 1 "Admin login"
    echo "   Response: $ADMIN_RESPONSE"
fi
echo ""

# =========================
# 3️⃣ SELLER REGISTRATION
# =========================
echo "3️⃣ Testing Seller Registration..."
TIMESTAMP=$(date +%s)
SELLER_RESPONSE=$(curl -s -X POST $BASE_URL/api/seller/auth/signup \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test Seller $TIMESTAMP\",
    \"email\": \"seller$TIMESTAMP@test.com\",
    \"phone\": \"98765$TIMESTAMP\",
    \"password\": \"password123\",
    \"businessName\": \"Test Crackers Shop\",
    \"businessType\": \"retailer\",
    \"businessAddress\": \"123 Test Street, Chennai\"
  }")

SELLER_ID=$(echo $SELLER_RESPONSE | grep -o '"_id":"[^"]*' | sed 's/"_id":"//')
SELLER_TOKEN=$(echo $SELLER_RESPONSE | grep -o '"token":"[^"]*' | sed 's/"token":"//')

if [ ! -z "$SELLER_ID" ]; then
    print_result 0 "Seller registration"
    echo "   Seller ID: $SELLER_ID"
else
    print_result 1 "Seller registration"
    echo "   Response: $SELLER_RESPONSE"
fi
echo ""

# =========================
# 4️⃣ SELLER KYC WORKFLOW
# =========================
echo "4️⃣ Testing Seller KYC Workflow..."

# Create dummy image for upload
touch dummy_image.jpg

# Upload KYC Documents
echo "   Uploading KYC documents..."
KYC_RESPONSE=$(curl -s -X POST "$BASE_URL/api/seller/kyc/upload" \
  -H "Authorization: Bearer $SELLER_TOKEN" \
  -F "aadhaarFront=@dummy_image.jpg" \
  -F "aadhaarBack=@dummy_image.jpg" \
  -F "panCard=@dummy_image.jpg" \
  -F "tradeLicense=@dummy_image.jpg" \
  -F "gstCertificate=@dummy_image.jpg" \
  -F "licenseImage=@dummy_image.jpg" \
  -F "fireNOC=@dummy_image.jpg" \
  -F "chequeImage=@dummy_image.jpg")

# Check if upload was successful (201 Created)
if echo "$KYC_RESPONSE" | grep -q "submitted successfully"; then
  print_result 0 "KYC documents uploaded"
else
  print_result 1 "KYC upload failed"
  echo "   Response: $KYC_RESPONSE"
fi

# Admin Get Pending KYC
echo "   Admin fetching pending KYC..."
PENDING_KYC=$(curl -s -X GET "$BASE_URL/api/admin/kyc/pending" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

# Extract KYC ID for the current seller
KYC_ID=$(echo "$PENDING_KYC" | jq -r ".[] | select(.sellerId._id == \"$SELLER_ID\") | ._id")

if [ -z "$KYC_ID" ] || [ "$KYC_ID" == "null" ]; then
  print_result 1 "Could not find pending KYC for seller"
else
  print_result 0 "Found pending KYC (ID: $KYC_ID)"
  
  # Admin Approve KYC
  echo "   Admin approving KYC..."
  APPROVE_RESPONSE=$(curl -s -X PUT "$BASE_URL/api/admin/kyc/review/$KYC_ID" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"status": "approved", "rejectionReason": ""}')
    
  if echo "$APPROVE_RESPONSE" | grep -q "KYC approved"; then
    print_result 0 "KYC approved"
  else
    print_result 1 "KYC approval failed"
    echo "   Response: $APPROVE_RESPONSE"
  fi
fi

# Clean up dummy image
rm dummy_image.jpg
echo ""

# =========================
# 5️⃣ SELLER PRODUCTS
# =========================
echo "5️⃣ Testing Get Seller Products..."
SELLER_PRODUCTS=$(curl -s -X GET $BASE_URL/api/products/my-products \
  -H "Authorization: Bearer $SELLER_TOKEN")

if echo "$SELLER_PRODUCTS" | grep -q "products"; then
    print_result 0 "Get seller products"
else
    print_result 1 "Get seller products"
    echo "   Response: $SELLER_PRODUCTS"
fi
echo ""

# =========================
# 6️⃣ SELLER ORDERS
# =========================
echo "6️⃣ Testing Get Seller Orders..."
SELLER_ORDERS=$(curl -s -X GET "$BASE_URL/api/seller/orders" \
  -H "Authorization: Bearer $SELLER_TOKEN")

if echo "$SELLER_ORDERS" | grep -q "\["; then
  print_result 0 "Get seller orders"
else
  print_result 1 "Get seller orders"
  echo "   Response: $SELLER_ORDERS"
fi
echo ""

# =========================
# 7️⃣ SELLER ANALYTICS
# =========================
echo "7️⃣ Testing Seller Analytics..."
SELLER_ANALYTICS=$(curl -s -X GET "$BASE_URL/api/seller/analytics/dashboard" \
  -H "Authorization: Bearer $SELLER_TOKEN")

if echo "$SELLER_ANALYTICS" | grep -q "totalSales\|totalRevenue\|totalEarnings\|totalOrders"; then
  print_result 0 "Get seller analytics"
else
  print_result 1 "Get seller analytics"
  echo "   Response: $SELLER_ANALYTICS"
fi
echo ""

# =========================
# 8️⃣ CUSTOMER REGISTRATION
# =========================
echo "8️⃣ Testing Customer Registration..."
CUSTOMER_RESPONSE=$(curl -s -X POST $BASE_URL/api/customer/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test Customer $TIMESTAMP\",
    \"email\": \"customer$TIMESTAMP@test.com\",
    \"phone\": \"87654$TIMESTAMP\",
    \"password\": \"password123\"
  }")

CUSTOMER_ID=$(echo $CUSTOMER_RESPONSE | grep -o '"_id":"[^"]*' | sed 's/"_id":"//')
CUSTOMER_TOKEN=$(echo $CUSTOMER_RESPONSE | grep -o '"token":"[^"]*' | sed 's/"token":"//')

if [ ! -z "$CUSTOMER_ID" ]; then
    print_result 0 "Customer registration"
else
    print_result 1 "Customer registration"
    echo "   Response: $CUSTOMER_RESPONSE"
fi
echo ""

# =========================
# 9️⃣ CUSTOMER PRODUCT BROWSING
# =========================
echo "9️⃣ Testing Get All Approved Products..."
PRODUCTS_RESPONSE=$(curl -s -X GET $BASE_URL/api/products/customer/)
if echo "$PRODUCTS_RESPONSE" | grep -q "\["; then
    print_result 0 "Get all products"
else
    print_result 1 "Get all products"
fi
echo ""

# =========================
# 🔟 SEARCH PRODUCTS
# =========================
echo "🔟 Testing Search Products..."
SEARCH_RESPONSE=$(curl -s -X GET "$BASE_URL/api/search?q=flower")
if echo "$SEARCH_RESPONSE" | grep -q "\["; then
    print_result 0 "Search products"
else
    print_result 1 "Search products"
fi
echo ""

# =========================
# 1️⃣1️⃣ CART & WISHLIST
# =========================
echo "1️⃣1️⃣ Testing Cart & Wishlist..."
CART_RESPONSE=$(curl -s -X GET $BASE_URL/api/cart \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$CART_RESPONSE" | grep -q "items"; then
    print_result 0 "Get customer cart"
else
    print_result 1 "Get customer cart"
fi

WISHLIST_RESPONSE=$(curl -s -X GET $BASE_URL/api/wishlist \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$WISHLIST_RESPONSE" | grep -q "\["; then
    print_result 0 "Get customer wishlist"
else
    print_result 1 "Get customer wishlist"
fi
echo ""

# =========================
# 1️⃣2️⃣ CUSTOMER ORDERS
# =========================
echo "1️⃣2️⃣ Testing Get Customer Orders..."
ORDERS_RESPONSE=$(curl -s -X GET $BASE_URL/api/orders \
  -H "Authorization: Bearer $CUSTOMER_TOKEN")

if echo "$ORDERS_RESPONSE" | grep -q "orders"; then
    print_result 0 "Get customer orders"
else
    print_result 1 "Get customer orders"
    echo "   Response: $ORDERS_RESPONSE"
fi
echo ""

# =========================
# 1️⃣3️⃣ ADMIN ANALYTICS & MANAGEMENT
# =========================
echo "1️⃣3️⃣ Testing Admin Analytics & Management..."
ADMIN_ANALYTICS=$(curl -s -X GET "$BASE_URL/api/admin/analytics/dashboard" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

if echo "$ADMIN_ANALYTICS" | grep -q "totalRevenue\|totalSales"; then
  print_result 0 "Get admin analytics"
else
  print_result 1 "Get admin analytics"
  echo "   Response: $ADMIN_ANALYTICS"
fi

ALL_SELLERS=$(curl -s -X GET "$BASE_URL/api/admin/sellers" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

if echo "$ALL_SELLERS" | grep -q "_id"; then
  print_result 0 "Get all sellers"
else
  print_result 1 "Get all sellers"
fi
echo ""

# ==========================================
# 📊 TEST SUMMARY
# ==========================================
echo "=========================================="
echo "📊 TEST SUMMARY"
echo "=========================================="
echo "Passed: $PASSED"
echo "Failed: $FAILED"
echo "Total: $((PASSED + FAILED))"

if [ $FAILED -gt 0 ]; then
  echo -e "\n⚠️  Some tests failed. Check the output above."
  exit 1
else
  echo -e "\n✅  ALL TESTS PASSED!"
  exit 0
fi
