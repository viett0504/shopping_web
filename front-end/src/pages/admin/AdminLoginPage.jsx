import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAdminAuthStore } from '../../stores/adminAuthStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const login = useAdminAuthStore((state) => state.login);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await login(data.email, data.password);
      toast.success('Đăng nhập thành công!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Đăng nhập thất bại!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">SportStore</h1>
            <p className="text-gray-600">Đăng nhập quản trị</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email không hợp lệ',
                },
              })}
              error={errors.email?.message}
              placeholder="admin@gmail.com"
            />

            <Input
              label="Mật khẩu"
              type="password"
              {...register('password', {
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự',
                },
              })}
              error={errors.password?.message}
              placeholder="••••••"
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={submitting}
            >
              {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
            <p className="font-medium text-blue-900 mb-1">Tài khoản demo:</p>
            <p className="text-blue-700">Email: admin@gmail.com</p>
            <p className="text-blue-700">Mật khẩu: 123456</p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              ← Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
