import { CompactTable, Column } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import type { QuizzesScore } from "@/global/types";
import type { StatisticsProps } from ".";

interface TableProps extends StatisticsProps {
    showRetake: boolean
}

/** Format time to --:-- */
const formatTime = (seconds?: number) => {
    if (!seconds) {
        return '--:--';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
};

export default function Table({ 
    quizScores,
    numOfQuestions,
    showRetake
} : TableProps) {
    // const theme = useTheme(getTheme());
    const theme = useTheme(getTheme(),);

    const COLUMNS: Column<QuizzesScore>[] = [
        { 
            label: "Name", 
            renderCell: (score: QuizzesScore) => score.username,
            resize: {
                minWidth: 100 
            }
        },
        { 
            label: "Score", 
            renderCell: (score: QuizzesScore) => score.score + "/" + numOfQuestions,
            resize: {
                minWidth: 100 
            }
        },
        { 
            label: "Time Taken", 
            renderCell: (score: QuizzesScore) => formatTime(score.time),
            resize: {
                minWidth: 100 
            }
        },
        { 
            label: "Submitted On", 
            renderCell: (score: QuizzesScore) => 
                new Date(score.submittedOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
            resize: {
                minWidth: 100 
            }
        },
        { 
            label: "Retake", 
            renderCell: (score: QuizzesScore) => score.retake ? 'Yes' : 'No',
            resize: {
                minWidth: 100 
            },
            hide: showRetake
        },
        // { label: "Retake Count", renderCell: (score: QuizzesScore) => 0},
        { 
            label: "Retake Score", 
            renderCell: (score: QuizzesScore) => score.retakeScore + "/" + numOfQuestions,
            resize: {
                minWidth: 100 
            },
            hide: showRetake
        },
        { 
            label: "Retake Time", 
            renderCell: (score: QuizzesScore) => formatTime(score.retakeTime),
            resize: {
                minWidth: 100 
            },
            hide: showRetake
        },
        { 
            label: "Updated On", 
            renderCell: (score: QuizzesScore) => 
                new Date(score.submittedOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
            resize: {
                minWidth: 100 
            },
            hide: showRetake
        },
    ];

    return (
        <div className="w-full shadow-lg rounded-md p-2 overflow-hidden bg-white">
            <CompactTable
                columns={COLUMNS} 
                data={{ nodes: quizScores }} 
                theme={theme}
                layout={{ horizontalScroll: true }}
            />
        </div>
    )
}