type Props = {
    heading: string;
    body: string;
}

const FormHeadTag = ({ heading, body }: Props) => {
    const logo = "/android-chrome-192x192.png"
    return (
        <div className="my-2 flex flex-col items-center">
            <img src={logo} className="w-12 h-12" />
            <h2
                className="text-3xl font-header font-medium"
            >
                {heading}
            </h2>
            <p className="text-sm">{body}</p>
        </div>
    )
}

export default FormHeadTag