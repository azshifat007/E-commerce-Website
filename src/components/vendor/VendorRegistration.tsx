import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useVendorStore } from '@/store/vendor';
import { Loader2 } from 'lucide-react';

const vendorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zip: z.string().min(5, 'ZIP code is required'),
  }),
  businessInfo: z.object({
    registrationNumber: z.string().min(5, 'Registration number is required'),
    taxId: z.string().min(5, 'Tax ID is required'),
    phoneNumber: z.string().min(10, 'Valid phone number is required'),
  }),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
});

type VendorFormData = z.infer<typeof vendorSchema>;

export function VendorRegistration() {
  const [isLoading, setIsLoading] = React.useState(false);
  const registerVendor = useVendorStore((state) => state.registerVendor);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
  });

  const onSubmit = async (data: VendorFormData) => {
    setIsLoading(true);
    try {
      await registerVendor(data);
      // Show success message
    } catch (error) {
      console.error(error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Become a Vendor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              {...register('name')}
              className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Shop Name</label>
          <input
            {...register('shopName')}
            className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
          />
          {errors.shopName && (
            <p className="text-red-500 text-sm mt-1">{errors.shopName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Business Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Registration Number
                </label>
                <input
                  {...register('businessInfo.registrationNumber')}
                  className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tax ID</label>
                <input
                  {...register('businessInfo.taxId')}
                  className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  {...register('businessInfo.phoneNumber')}
                  className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Street</label>
                <input
                  {...register('address.street')}
                  className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    {...register('address.city')}
                    className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    {...register('address.state')}
                    className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                <input
                  {...register('address.zip')}
                  className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  );
}