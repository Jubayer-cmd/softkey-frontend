import { ProfileOutlined, TableOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { USER_ROLE } from './role';
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps['items'] = [
    {
      label: 'Profile',
      key: 'profile',
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps['items'] = [
    {
      label: <Link href={`/${role}/manage-service`}>Manage Service</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-service`,
    },
    {
      label: <Link href={`/${role}/manage-product`}>Manage Product</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-product`,
    },
    {
      label: <Link href={`/${role}/manage-category`}>Manage Category</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-category`,
    },
    {
      label: <Link href={`/${role}/manage-blog`}>Manage Blogs</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-blog`,
    },
    {
      label: <Link href={`/${role}/manage-user`}>Manage Users</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
    },
    {
      label: <Link href={`/${role}/manage-review`}>Manage Reviews</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-review`,
    },
    {
      label: <Link href={`/${role}/manage-booking`}>Manage Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-booking`,
    },
  ];

  const adminSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    // {
    //   label: "Manage academic",
    //   key: "manage-academic",
    //   icon: <TableOutlined />,
    //   children: [
    //     {
    //       label: <Link href={`/${role}/academic/faculty`}>Faculties</Link>,
    //       key: `/${role}/academic/faculty`,
    //     },
    //     {
    //       label: <Link href={`/${role}/academic/department`}>Departments</Link>,
    //       key: `/${role}/academic/department`,
    //     },
    //     {
    //       label: <Link href={`/${role}/academic/semester`}>Semesters</Link>,
    //       key: `/${role}/academic/semester`,
    //     },
    //   ],
    // },
    // {
    //   label: "Management",
    //   key: "management",
    //   icon: <AppstoreOutlined />,
    //   children: [
    //     {
    //       label: <Link href={`/${role}/department`}>Department</Link>,
    //       key: `/${role}/department`,
    //     },
    //     {
    //       label: <Link href={`/${role}/building`}>Building</Link>,
    //       key: `/${role}/building`,
    //     },
    //     {
    //       label: <Link href={`/${role}/room`}>Rooms</Link>,
    //       key: `/${role}/room`,
    //     },
    //     {
    //       label: <Link href={`/${role}/course`}>Course</Link>,
    //       key: `/${role}/course`,
    //     },
    //     {
    //       label: (
    //         <Link href={`/${role}/semester-registration`}>
    //           Semester registration
    //         </Link>
    //       ),
    //       key: `/${role}/semester-registration`,
    //     },
    //     {
    //       label: <Link href={`/${role}/offered-course`}>Offered courses</Link>,
    //       key: `/${role}/offered-course`,
    //     },
    //     {
    //       label: (
    //         <Link href={`/${role}/offered-course-section`}>
    //           Course sections
    //         </Link>
    //       ),
    //       key: `/${role}/offered-course-section`,
    //     },
    //   ],
    // },
  ];

  const superAdminSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
  ];

  const userSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/orders`}>Orders</Link>,
      icon: <TableOutlined />,
      key: `/${role}/orders`,
    },
    {
      label: <Link href={`/${role}/booking`}>Booking</Link>,
      icon: <TableOutlined />,
      key: `/${role}/booking`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
