const Notes = () => {
  return (
    <div>
      <h1>Notes on things to come and current issues</h1>
      <ul>
        <li>
          Auth will be coming soon! I just want to test this out and see if it's
          worth moving forward with it.
        </li>
        <li>
          Currently, the "delete" button does not clear the prefix from the
          field. It does clear it in the database, but not on the UI side. Just
          refresh the page to see the current status.
        </li>
        <li>
          I'm wondering if the "prefix" field is even necessary. I wanted to
          make it quicker to go between letters and numbers on the keyboard, but
          as of now there really isn't a difference.Let me knwo what you think.
        </li>
        <li>
          Door History does not currently work. It's more of a placeholder at
          this point.{" "}
        </li>
        <li>
          This notes section will eventualy be replaced with a field for actual
          notes{" "}
          <em>
            (i.e. you can make a note that there's a GSDS order in the trailer,
            or if the current trailer is red tagged, etc)
          </em>
        </li>
      </ul>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Notes;
