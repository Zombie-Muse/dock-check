const Notes = () => {
  return (
    <div>
      <h1>Notes on things to come and current issues</h1>
      <ul>
        <li>Auth is here. Make an account and access the app. Simple.</li>
        <li>
          "Arrive" checkbox is now active. Once the trailer is arrived, just
          uncheck the box.
        </li>
        <li>Prefix is now "trailer type."</li>
        <li>
          I'm having some issues with the color coded for "empty," "breakout,"
          and "arrive" feature. It's a little buggy at times. I'm working on it.
        </li>
        <li>
          Door History still does not currently work. It's more of a placeholder
          at this point.{" "}
        </li>
        <li>
          Notes sections are now available. They appear in the edit trailer
          screen at the bottom.
          <em>
            (i.e. you can make a note that there's a GSDS order in the trailer,
            or if the current trailer is red tagged, etc)
          </em>
        </li>
        <li>
          I think I will change the breakout and arrive checkboxes to a toggle
          switch instead. Once the trailer is arrived, it will automatically
          switch to breakout. Status won't display multiple inputs (it will only
          display the right-most in the checkbox row).
        </li>
        <li>
          I'm also working on search trailer functionality and filtered views.
          <em>
            i.e. you can display all trailers that need to be arrived or all
            breakouts.
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
