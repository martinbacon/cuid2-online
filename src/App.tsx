import {useState} from 'react'
import './App.css'

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {ThemeProvider} from "@/components/theme-provider.tsx";

import {createId, isCuid} from '@paralleldrive/cuid2';
import {AlertCircle, Terminal} from "lucide-react";

function App() {
    const [cuid, setCuid] = useState("")
    const [generatedCuid, setGeneratedCuid] = useState("")
    const [validCuid, setValidCuid] = useState(false)
    const [firstTime, setFirstTime] = useState(false)

    const onClick = () => {
        setFirstTime(true);
        setValidCuid(isCuid(cuid));
    }

    const generateCuid = () => {
        const newCuid = createId();
        setGeneratedCuid(newCuid);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCuid);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClick();
        }
    }

    const AlertSuccess = () => {
        return (
            <Alert>
                <Terminal className="h-4 w-4"/>
                <AlertTitle>Valid</AlertTitle>
                <AlertDescription>
                    Your CUID2 is valid.
                </AlertDescription>
            </Alert>
        );
    }

    const AlertDestructive = () => {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Your CUID2 is invalid.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="w-full text-center mt-32">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    CUID2 Generator and Checker
                </h1>
            </div>
            <div className="w-full max-w-md mt-16">
                <div className="flex justify-center space-x-2 my-4">
                    <Input type="text" value={generatedCuid} readOnly placeholder="Generated CUID2"/>
                    <Button onClick={generateCuid} type="button">Generate</Button>
                    <Button onClick={copyToClipboard} type="button">Copy</Button>
                </div>
                <div className="flex justify-center space-x-2">
                    <Input type="text" onChange={e => setCuid(e.target.value)} onKeyDown={handleKeyDown}
                           placeholder="CUID2"/>
                    <Button onClick={onClick} type="submit">Check</Button>
                </div>
                {firstTime ?
                    <div className="flex justify-center my-4">{validCuid ? AlertSuccess() : AlertDestructive()}
                    </div> : null}
            </div>
        </ThemeProvider>
    )
}

export default App