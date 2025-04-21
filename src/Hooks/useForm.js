import { useState } from 'react'

export const useForm = (initialForm = {}) => {

    const [formState, setFromStare]  =  useState(initialForm)

     const OnInputchange = ({target}) =>{
      const {name, value} = target
      setFromStare({
        ...formState,
        [name]:value
      })
    }


  return {
    ...formState,
    formState,
    OnInputchange
  }
}
