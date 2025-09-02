'use client'
import { authApi } from '@/shared/api'
import { createSelector } from '@reduxjs/toolkit'

export const selectMeResult = authApi.endpoints.me.select()
export const selectMe = createSelector(selectMeResult, r => r.data ?? null)
export const selectIsLoggedIn = createSelector(selectMe, me => Boolean(me && !me.isBlocked))
export const selectUserId = createSelector(selectMe, me => me?.userId ?? null)
export const selectEmail = createSelector(selectMe, me => me?.email ?? null)
