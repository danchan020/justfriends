import React from 'react'
import { Avatar } from '@chakra-ui/react'
import {useSelector ,useDispatch} from 'react-redux'
import { selectUser } from  '../features/user'

export default function UserProfile() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

  return (
    <>
      <Avatar size='2xl' src={ user ? user.avatar : null} />
      <div>{ user ? user.username : null }</div>
    </>
    
  )
}
