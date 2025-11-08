export enum ERRORS_DICTIONARY {
  // AUTH
  EMAIL_EXISTED = 'ATH_0091', // Email đã tồn tại khi đăng ký
  WRONG_CREDENTIALS = 'ATH_0001', // Sai email hoặc mật khẩu
  CONTENT_NOT_MATCH = 'ATH_0002', // Nội dung (mật khẩu confirm, OTP, …) không khớp
  UNAUTHORIZED_EXCEPTION = 'ATH_0011', // Không có quyền truy cập (chưa đăng nhập)
  TOKEN_EXPIRED = 'ATH_0012', // Token hết hạn
  TOKEN_INVALID = 'ATH_0013', // Token không hợp lệ
  ACCOUNT_LOCKED = 'ATH_0014', // Tài khoản bị khóa
  PASSWORD_WEAK = 'ATH_0015', // Mật khẩu không đạt yêu cầu
  PASSWORD_REUSED = 'ATH_0016', // Mật khẩu trùng với mật khẩu cũ
  OTP_EXPIRED = 'ATH_0017', // Mã OTP đã hết hạn
  OTP_INVALID = 'ATH_0018', // Mã OTP không đúng
  NOT_ACCESS_TOKEN = 'ATH_0019', // Không có access token
  NOT_REFRESH_TOKEN = 'ATH_0020', // Không có refresh token

  // USER - PROFILE
  USER_NOT_FOUND = 'USR_0041', // Không tìm thấy người dùng
  USER_INACTIVE = 'USR_0042', // Người dùng bị vô hiệu hóa
  USER_ALREADY_EXISTS = 'USR_0043', // Người dùng đã tồn tại
  USER_PROFILE_INCOMPLETE = 'USR_0044', // Hồ sơ chưa hoàn chỉnh
  USER_NO_PERMISSION = 'USR_0045', // Người dùng không có quyền thao tác
  USER_UPDATE_FAILED = 'USR_0046', // Cập nhật người dùng thất bại
  ID_NOT_FOUND = 'USR_0047', // ID không tồn tại
  PROFILE_NOT_FOUND = 'USR_0048', // Hồ sơ không tồn tại
  FORBIDDEN_UPDATE_PROFILE = 'USR_0049', // Không có quyền cập nhật hồ sơ
  FILE_NOT_FOUND = 'USR_0050', // Không tìm thấy file tải lên
  FILE_TYPE_NOT_ALLOWED = 'USR_0051', // Loại file không được phép tải lên
  FILE_TOO_LARGE = 'USR_0052', // Kích thước file quá lớn
  INVALID_MONTH = 'USR_0053', // Tháng không hợp lệ
}
