import { useState } from 'react'

export const usePostActions = () => {
  const [postActions, setPostActions] = useState(false)
  const [editPost, setEditPost] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const togglePostActions = () => setPostActions(prev => !prev)
  const startEdit = () => {
    setEditPost(true)
    setPostActions(false)
  }
  const stopEdit = () => setEditPost(false)
  const stopPostActions = () => setPostActions(false)

  const getIcon = () => (postActions || isHovered ? '/kebab-chosen-hover.svg' : '/kebab.svg')

  return { postActions, editPost, setIsHovered, togglePostActions, startEdit, stopEdit, stopPostActions, getIcon }
}
