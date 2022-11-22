import { React, useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import '../scrumboard/scrumboard.css'

export default function Tasks({data, deleteTask}) {  


  const [weeklyTasks, setWeeklyTasks] = useState(data)

  const [dailyTasks, setDailyTasks] = useState([])

  useEffect(() => { 
    setWeeklyTasks(data)
  }, [data])


  // Function called when Drag Ends
  const onDragEnd = (result) => {

    console.log(result)
    // const { source, destination } = result
    if (!result.destination) return;

    if (result.source.droppableId === result.destination.droppableId) {
      if (result.source.droppableId === "weekly-tasks") {
        let tempWeeklyList = Array.from(data);
        const [reorderedItem] = tempWeeklyList.splice(result.source.index, 1);
        tempWeeklyList.splice(result.destination.index, 0, reorderedItem)

        setWeeklyTasks(tempWeeklyList)
      }
      else {
        let tempDailyList = Array.from(dailyTasks);
        const [reorderedItem] = tempDailyList.splice(result.source.index, 1)
        
        tempDailyList.splice(result.destination.index, 0, reorderedItem)
        setDailyTasks(tempDailyList)
      }
    } else {
      let tempWeeklyList = weeklyTasks
      let tempDailyList = dailyTasks

      if (result.source.droppableId === "weekly-tasks") {
        const [removed] = tempWeeklyList.splice(result.source.index, 1)
        tempDailyList.splice(result.destination.index, 0, removed)
        setWeeklyTasks(tempWeeklyList)
        setDailyTasks(tempDailyList)
      } else {
        const [removed] = tempDailyList.splice(result.source.index, 1)
        tempWeeklyList.splice(result.destination.index, 0, removed)
        setWeeklyTasks(tempWeeklyList)
        setDailyTasks(tempDailyList)
      }
    }
  }


  return (
    <div className='tasker'>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='container'>
            <Droppable droppableId='weekly-tasks'  >
                {(provided ) => (
                    <div className='weekly box'
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                    >
                      <div className='weekly-section-title'>
                            Weekly Tasks
                      </div>
                      <div className='kanban-section-content scroll'>
                            {weeklyTasks.map(({id, name, time_created, scrumgoalhistory_set}, index) => {
                              return (
                                <Draggable key={id} draggableId={id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                      <div className='kanban-items'
                                        
                                            key={id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              ...provided.draggableProps.style,
                                              opacity: snapshot.isDragging ? '0.5' : '1'
                                          }}
                                          onClick={() => {deleteTask(id)}}
                                        >
                                            {name}
                                            <div id='time'>  {time_created.slice(0,10)} at {time_created.slice(12,16)} </div>
                                            <div className='blue'>
                                              {scrumgoalhistory_set.map(({id, done_by}) => {
                                                return (
                                                  <p key={id}> Done by: {done_by} </p>
                                                )
                                              })}
                                            </div>
                                      </div>
                                    )}

                                </Draggable>
                            )})}
                      </div>
                      {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="daily-tasks">
                {(provided) => (
                    <div className='daily box'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    
                    >
                      <div className='daily-section-title'>
                            Daily Tasks
                      </div>
                            <div className='kanban-section-content scroll'>
                            {dailyTasks.map(({id, name, time_created, scrumgoalhistory_set}, index) => {
                              return (
                                <Draggable key={id} draggableId={id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                      <div className='kanban-items'
                                        
                                            key={id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              ...provided.draggableProps.style,
                                              opacity: snapshot.isDragging ? '0.5' : '1'
                                          }}
                                          onClick={() => {deleteTask(id)}}
                                        >
                                            {name}
                                            <div id='time'> {time_created.slice(0,10)} at {time_created.slice(12,16)} </div>
                                            <div className='blue'>
                                              {scrumgoalhistory_set.map(({id, done_by}) => {
                                                return (
                                                  <p key={id}> Done by: {done_by} </p>
                                                )
                                              })}
                                            </div>
                                      </div>
                                    )}

                                </Draggable>
                            )})} 
                            </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        
      </div>
    </DragDropContext>
    </div>
  );


}
