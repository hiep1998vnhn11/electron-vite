export enum RoleEnum {
  SUPER = 'super',
  TEST = 'test',
  SHIPPER = 'shipper',
  OWNER = 'owner',
  ADMIN = 'admin',
}

export enum EmployeeRoleEnum {
  SHIPPER = 'shipper',
  OWNER = 'owner',
}

export enum EmployeeRoleNameEnum {
  SHIPPER = 'Shipper',
  OWNER = 'Quản lý kho',
}

export const nameRoles = {
  [EmployeeRoleEnum.SHIPPER]: EmployeeRoleNameEnum.SHIPPER,
  [EmployeeRoleEnum.OWNER]: EmployeeRoleNameEnum.OWNER,
  [RoleEnum.ADMIN]: 'Admin',
};
