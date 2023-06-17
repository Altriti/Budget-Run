import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Button, Card, Header, Segment } from "semantic-ui-react";

export default observer(function AllMessagesList() {
    const { messageStore } = useStore();
    const { loadMessages, messages, loadingInitial, approve } = messageStore;
    const [showSentMessages, setShowSentMessages] = useState(false);
    const [showReceivedMessages, setShowReceivedMessages] = useState(false);
    const DayInMilliseconds = 24 * 60 * 60 * 1000;

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    const formatTime = (time: string) => {
        const options = { dateStyle: "short" };
        const approvedTime = new Date(time);
        const currentTime = new Date();

        const timeDifference = currentTime.getTime() - approvedTime.getTime();
        const daysDifference = Math.floor(timeDifference / DayInMilliseconds);

        if (daysDifference === 0) {
            return "Today";
        } else if (daysDifference === 1) {
            return "Yesterday";
        } else {
            if (daysDifference >= 31) {
                return new Date(time).toLocaleString(undefined, options as Intl.DateTimeFormatOptions);
            }
            else {
                return `${daysDifference} days ago`;
            }
        }
    };

    if (loadingInitial || !messages) return <LoadingComponent content="Loading messages..." />;

    const sortedSentMessages = [...messages.sentMessages].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    const sortedReceivedMessages = [...messages.receivedMessages].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    const handleToggleSentMessages = () => {
        setShowSentMessages(!showSentMessages);
    };

    const handleToggleReceivedMessages = () => {
        setShowReceivedMessages(!showReceivedMessages);
    };


    return (
        <Segment raised>
            <Header
                style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                    textDecoration: "underline",
                    color: "red",
                }}
            >
                Notes
            </Header>
            <Segment raised>
                <Header
                    style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        textDecoration: "underline",
                        color: "red",
                    }}
                >
                    Sent notes
                </Header>
                {showSentMessages &&
                    sortedSentMessages.map((message) => (
                        <Segment basic>
                            <Card
                                fluid
                                key={message.id}
                                style={{
                                    borderTop: message.approved ? "1px solid green" : "1px solid red",
                                    boxShadow: "none",
                                }}
                            >
                                <Card.Meta>
                                    <div
                                        style={{
                                            color: message.approved ? "green" : "red",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>
                                            {message.approved ? `Approved ${formatTime(message.approvedTime)}` : "Not Approved"}
                                        </span>
                                        <span>sent: {formatTime(message.time)}</span>
                                    </div>
                                </Card.Meta>
                                <Card.Description style={{ fontWeight: "bold" }}>
                                    <span style={{ color: "lightgrey" }}>from :</span>
                                    {message.sender.displayName}
                                </Card.Description>
                                <Card.Header style={{ fontSize: "17px", marginTop: "1em" }}>
                                    {message.content}
                                </Card.Header>
                            </Card>
                        </Segment>
                    ))}
                <Header
                    className="blueHover"
                    onClick={handleToggleSentMessages}
                    content={showSentMessages ? "Hide Sent Notes" : "Show Sent Notes"}
                    style={{ fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}
                    as="a"
                ></Header>
            </Segment>
            <Segment raised>
                <Header
                    style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        textDecoration: "underline",
                        color: "red",
                    }}
                >
                    Received notes
                </Header>
                {showReceivedMessages &&
                    sortedReceivedMessages.map((message) => (
                        <Segment basic>
                            <Card
                                fluid
                                key={message.id}
                                style={{
                                    borderTop: message.approved ? "1px solid green" : "1px solid red",
                                    boxShadow: "none",
                                }}
                            >
                                <Card.Meta>
                                    <div
                                        style={{
                                            color: message.approved ? "green" : "red",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>
                                            {message.approved ? `Approved ${formatTime(message.approvedTime)}` : "Not Approved"}
                                        </span>
                                        <span>recieved: {formatTime(message.time)}</span>
                                    </div>
                                </Card.Meta>
                                <Card.Description style={{ fontWeight: "bold" }}>
                                    <span style={{ color: "lightgrey" }}>from :</span>
                                    {message.sender.displayName}
                                </Card.Description>
                                <Card.Header style={{ fontSize: "17px", marginTop: "1em" }}>
                                    {message.content}
                                </Card.Header>
                                {message.approved ? null : (
                                    <Button
                                        className="deleteButton"
                                        color="red"
                                        onClick={() => approve(message.id)}
                                        content="Approve"
                                    />
                                )}
                            </Card>
                        </Segment>
                    ))}
                <Header
                    className="blueHover"
                    onClick={handleToggleReceivedMessages}
                    content={
                        showReceivedMessages ? "Hide Received Notes" : "Show Received Notes"
                    }
                    style={{ fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}
                    as="a"
                ></Header>
            </Segment>
        </Segment>
    );
});