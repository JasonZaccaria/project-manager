interface Notes {

    [key: string]: Note,

}

 

interface Note {

    notesTitle: string,

    notesDates: string,

    notesData: string,

    files: string[],

}

 

interface Goals {

    [key: string]: Goal,

}

 

interface Goal {

    goalTitle: string,

    goalData: string,

}

 

interface Deadlines {

    [key: string]: Deadline,

}

 

interface Deadline {

    deadlineTitle: string,

    deadlineDate: string,

}

 

interface projectResponse {

    [key: string]: Projects,

}

 

interface Projects {

    title: string,

    date: string,

    notes: Notes,

    goals: Goals,

    deadlines: Deadlines,

}

 

export type {Notes, Note, Goals, Goal, Deadlines, Deadline, projectResponse, Projects};