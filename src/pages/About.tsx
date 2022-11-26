import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  if (!sessionStorage.getItem("token")) navigate("/login");
  return (
    <>
      <div className="px-32 pt-16 pb-8 text-2xl min-h-full text-left">
        {`CruXipher is a CTF-style event organized by CRUx in collaboration with SOS.`}
      </div>
      <div className="px-32 pt-16 pb-8 text-2xl min-h-full text-left">
        {`This CTF (Capture the Flag) tournament involves teams solving various tasks to hunt for "flags", which are strings of the form "$Crux{...}" for the programming sections and "$Sos{...}" for the open-source section.`}
      </div>
      <div className="px-32 pt-16 pb-8 text-2xl min-h-full text-left">
        You submit these flags on the tournament's site to score points.
      </div>
      <div className="px-32 pt-16 pb-8 text-2xl min-h-full text-left">
        Your team will be competing against other teams from all over the
        country to solve various programming and computer systems-related
        problems in an exhilarating race against time!
      </div>
      <div className="px-32 pt-16 pb-8 text-2xl min-h-full text-left font-bold">
        You are allowed to search for things on the internet.
      </div>
      <div className="px-32 pt-16 pb-8 text-2xl min-h-full text-left">
        All the questions for this event and the website were created by members
        of CRUx and SOS. To learn more about CRUx, visit our site at
        https://crux-bphc.com To learn more about SOS, visit our site at
        https://bits-sos.github.io
      </div>
    </>
  );
};

export default About;
