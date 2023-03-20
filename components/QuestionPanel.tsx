interface QuestionPanelProps {
  question: string;
}

function QuestionPanel({ question }: QuestionPanelProps) {
  return (
    <>
      <h6>Question</h6>
      <div
        className="h-75 d-inline-block border"
        placeholder="Question goes here..."
      >
        {question}
      </div>
    </>
  );
}

export default QuestionPanel;
