import { useReducer, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
// Components
import Spinner from '../../Spinner/Spinner';
import toast from "react-hot-toast";
// Reducers
import ArrayReducer from 'src/context/reducers/arrayReducer'
// Types
type StackType = {
    id: string,
    image_svg_url: string,
    name: string,
    type: string
}

type AddStackModalProps = {
    type: string,
    frontendStack: StackType[],
    backendStack: StackType[],
    project: string,
    isModalOpen: boolean,
    onClose: () => void
}
// Query
const GET_STACKS = gql`
    query GetStacks($type: String!) {
        technologies(where: {type: {_eq: $type}}) {
            id
            image_svg_url
            name
        }
    }
`

const RESET_STACK = gql`
    mutation ResetStack($project_id: bigint!, $type: String!) {
        delete_project_technology(where: {project_id: {_eq: $project_id}, technology: {type: {_eq: $type}}}) {
            affected_rows
        }
    }
`

// const INSERT_STACK = gql`
//     mutation InsertStack($project_id: bigint!, $technology_id: String!) {
//         insert_project_technology(objects: {project_id: $project_id, technology_id: $technology_id}) {
//             affected_rows
//         }
//     }
// `

const INSERT_STACK = gql`
    mutation InsertStack($stack: [project_technology_insert_input!]!) {
        insert_project_technology(objects: $stack) {
            affected_rows
        }
    }
`

const AddStackModal = ({ type, frontendStack, backendStack, project, isModalOpen, onClose }: AddStackModalProps) => {
    const [state, dispatch] = useReducer(ArrayReducer, { dataList: [] as StackType[] })

    const [loadStacks, { called, loading, data }] = useLazyQuery(
        GET_STACKS,
        { variables: { type: type } }
    );
    const [resetStack] = useMutation(RESET_STACK)
    const [confirmStack] = useMutation(INSERT_STACK, {
        onCompleted: (() => onClose())
    })

    useEffect(() => {
        const firstEl = state?.dataList as StackType[];
        if( type === 'frontend' && (firstEl[0]?.name !== frontendStack[0]?.name) ) {
            console.log("frontend called")
            dispatch({ type: 'SET', payload: frontendStack})
        } else if ( type === 'backend' && (firstEl[0]?.name !== backendStack[0]?.name) ) {
            console.log("backend called")
            dispatch({ type: 'SET', payload: backendStack })
        }
        if(!called) {
            loadStacks()
        }
    }, [called, frontendStack, type, backendStack, state.dataList, loadStacks])

    const isInStack = (tech: any) => {
        const stackArrayLen = state.dataList.length
        let posInArray = -1

        for(let i: number = 0; i < stackArrayLen; i++) {
            if('name' in (state.dataList[i] as StackType)){
                const arrayEl = state.dataList[i] as StackType
                if(arrayEl.name === tech.name) {
                    posInArray = i
                    break
                }
            }
        }

        return posInArray
    }

    const handleClick = (tech: StackType) => {
        const elPos = isInStack(tech)
        if(elPos !== -1){
            dispatch({ type: 'POP', payload: tech, index: (elPos) })
        } else {
            dispatch({ type: 'PUSH', payload: tech })
        }
    }

    const handleStackConfirm = () => {
        toast.promise(
            resetStack({
                variables: { "project_id": (parseInt(project)), "type": type }
            }).then(() => {
                const newList = state.dataList.map((tech: any, index: number) => {
                    return {
                        project_id: project,
                        technology_id: tech.id
                    }
                })
                confirmStack({
                    variables: { "stack": newList }
                })
                
            }), 
            {
                loading: 'Updating Stack...',
                success: <b>Stack Updated!</b>,
                error: <b>Error! Stack Updation failed</b>,
            }
        )
    }

    const abortStackAddition = () => {
        if( type === 'frontend') {
            dispatch({ type: 'SET', payload: frontendStack})
        } else if ( type === 'backend') {
            dispatch({ type: 'SET', payload: backendStack })
        }
        onClose()
    }

    // console.log(state.dataList)

    return (
        <div className="bg-white overflow-hidden p-5 rounded">
            <div className="font-bold text-lg mb-2">Select Technologies</div>
            <div className="flex flex-col max-h-96 overflow-y-auto">   
                {
                    loading ? <div className="mt-2"><Spinner size={1}/></div> :
                        data?.technologies?.map((tech: any, index: number) => {
                            let isInList = (isInStack(tech) !== -1)

                            return(
                                <button
                                    onClick={() => handleClick(tech)}
                                    className={`${isInList ? "border-2 border-theme_green" : "border border-black-fifteen_op"} flex justify-between py-2 px-3 mb-1 rounded`}
                                    key={index}>
                                        {tech.name}
                                </button>
                            )
                        })
                }
            </div>
            <div className="grid grid-cols-perc-30-2 mt-2 gap-1">
                <button 
                    onClick={abortStackAddition}
                    className="py-3 px-1 border-2 border-theme_blue rounded">
                    Cancel
                </button>
                <button 
                    onClick={handleStackConfirm}    
                    className="py-3 bg-theme_blue text-white rounded">
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default AddStackModal