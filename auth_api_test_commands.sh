# Các lệnh curl kiểm thử API auth (register, login) với các trường hợp lỗi và kịch bản biên
# Lưu ý: Thay đổi port thành 3069 theo yêu cầu

# 1. Đăng ký với email đã tồn tại
curl -X POST http://localhost:3069/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"existing@example.com\", \"password\":\"password123\", \"fullName\":\"User Existing\"}"

# 2. Đăng ký với dữ liệu thiếu (thiếu email)
curl -X POST http://localhost:3069/api/auth/register -H "Content-Type: application/json" -d "{\"password\":\"password123\", \"fullName\":\"User No Email\"}"

# 3. Đăng ký với dữ liệu không hợp lệ (email sai định dạng)
curl -X POST http://localhost:3069/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"invalid-email\", \"password\":\"password123\", \"fullName\":\"User Invalid Email\"}"

# 4. Đăng nhập với email không tồn tại
curl -X POST http://localhost:3069/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"notexist@example.com\", \"password\":\"password123\"}"

# 5. Đăng nhập với mật khẩu sai
curl -X POST http://localhost:3069/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"existing@example.com\", \"password\":\"wrongpassword\"}"

# 6. Đăng nhập với dữ liệu thiếu (thiếu password)
curl -X POST http://localhost:3069/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"existing@example.com\"}"
