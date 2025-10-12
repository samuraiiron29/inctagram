export type SettingsResponseType = {
  id: number,
  userName: string,
  firstName: string,
  lastName: string,
  city: string,
  country: string,
  region: string,
  dateOfBirth: number, // ???
  aboutMe: string,
  avatars: AvatarType[],
  createdAt: number // ???
}

export type AvatarType = {
	url: string,
	width: number,
	height: number,
	fileSize: number,
	createdAt: number
}

export type ProfileDataType = {
  userName: string,
  firstName: string,
  lastName: string,
  city: string,
  country: string,
  region: string,
  dateOfBirth: number, // ???
  aboutMe: string,
}