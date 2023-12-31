import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

interface IErrorMessageProps {
    message: string
}


function ErrorMessage({ message }: IErrorMessageProps) {

    return(
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    );
}

export default ErrorMessage;