import { Deadlines } from "./deadlines/DeadlinesType";
import { Files } from "./FilesType";
import { Notes } from "./note/NotesType";

interface ProjectData {
    notes: Notes[],
    deadlines: Deadlines[],
    files: Files[]
}

export type { ProjectData };