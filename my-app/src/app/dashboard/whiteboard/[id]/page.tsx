export default async function WhiteboardPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

  return (
    <div>
      <h1>Whiteboard</h1>
    </div>
  );
}
