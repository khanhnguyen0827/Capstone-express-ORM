# Các lệnh curl kiểm thử API hình ảnh với các trường hợp hợp lệ và không hợp lệ

# 1. getImages - Lấy danh sách ảnh (trường hợp hợp lệ)
curl -X GET "http://localhost:3000/api/images?page=1&pageSize=5&search=flower" -H "Content-Type: application/json"

# 2. getImageById - Lấy ảnh theo ID (hợp lệ)
curl -X GET "http://localhost:3000/api/images/1" -H "Content-Type: application/json"

# 3. getImageById - Lấy ảnh theo ID (không hợp lệ - ID không tồn tại)
curl -X GET "http://localhost:3000/api/images/999999" -H "Content-Type: application/json"

# 4. getCommentsByImageId - Lấy bình luận theo ID ảnh (hợp lệ)
curl -X GET "http://localhost:3000/api/images/1/comments" -H "Content-Type: application/json"

# 5. getCommentsByImageId - Lấy bình luận theo ID ảnh (không hợp lệ - ID ảnh không tồn tại)
curl -X GET "http://localhost:3000/api/images/999999/comments" -H "Content-Type: application/json"

# 6. checkSavedImage - Kiểm tra ảnh đã lưu (hợp lệ)
curl -X GET "http://localhost:3000/api/images/1/check-saved" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -H "Content-Type: application/json"

# 7. checkSavedImage - Kiểm tra ảnh đã lưu (không hợp lệ - thiếu token hoặc ID)
curl -X GET "http://localhost:3000/api/images/999999/check-saved" -H "Content-Type: application/json"

# 8. postComment - Thêm bình luận (hợp lệ)
curl -X POST "http://localhost:3000/api/images/1/comments" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -H "Content-Type: application/json" -d "{\"content\":\"Bình luận test\"}"

# 9. postComment - Thêm bình luận (không hợp lệ - thiếu nội dung)
curl -X POST "http://localhost:3000/api/images/1/comments" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -H "Content-Type: application/json" -d "{}"

# 10. deleteImage - Xóa ảnh (hợp lệ)
curl -X DELETE "http://localhost:3000/api/images/1" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -H "Content-Type: application/json"

# 11. deleteImage - Xóa ảnh (không hợp lệ - không có quyền hoặc ảnh không tồn tại)
curl -X DELETE "http://localhost:3000/api/images/999999" -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -H "Content-Type: application/json"
