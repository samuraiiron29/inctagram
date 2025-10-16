import { baseApi } from '@/store/services/baseApi'
import { ProfileDataType, SettingsResponseType } from '../lib/types/settingsType'

export const setingsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfileData: build.query<SettingsResponseType, void>({
        query: () => 'users/profile'
    }),
    changeProfileData: build.mutation<SettingsResponseType, {profileData: ProfileDataType}>({
			query: ({profileData}) =>({
				url: 'users/profile',
				method: "PUT",
				body: profileData
			})
    })
  })
})

export const {useChangeProfileDataMutation, useGetProfileDataQuery} = setingsApi
