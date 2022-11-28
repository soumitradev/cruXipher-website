import { Loader, Pagination } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useEffect, useState } from "react";
import Twemoji from "../components/Twemoji";
import { useGlobalContext } from "../context/globalContext";
import { RankedTeam } from "../types/Leaderboard";

const Leaderboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState({} as RankedTeam[]);
  const { globalDispatch } = useGlobalContext();
  const [activePage, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const handlePagination = async (page: number) => {
    setPage(page);
    setIsLoaded(false);
    const response = await fetch(
      (import.meta.env.VITE_BACKEND_URL
        ? import.meta.env.VITE_BACKEND_URL
        : "") +
        "/api/leaderboardPublic/" +
        String(page),
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );
    const result = await response.json();
    if (response.status === 200) {
      setTeams(result);
      setIsLoaded(true);
    } else {
      globalDispatch({
        type: "send notification",
        payload: {
          disallowClose: false,
          autoClose: 3000,
          className: "pb-24 mb-24",
          color: "red",
          title: result.message,
          radius: "xs",
          icon: <IconX size={18} />,
          id: "submit-flag",
          loading: false,
          message: undefined,
        },
      });
    }
  };

  useEffect(() => {
    const loadNumberOfPages = async () => {
      const result = await fetch(
        (import.meta.env.VITE_BACKEND_URL
          ? import.meta.env.VITE_BACKEND_URL
          : "") + "/api/leaderboardPublicpages",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      const json = await result.json();
      if (result.status === 200) {
        setNumberOfPages(json.message);
      } else {
        globalDispatch({
          type: "show error",
          payload: {
            title: json.message,
            icon: <IconX size={18} />,
            message: undefined,
          },
        });
      }
    };
    const loadInitialPage = async () => {
      const result = await fetch(
        (import.meta.env.VITE_BACKEND_URL
          ? import.meta.env.VITE_BACKEND_URL
          : "") + "/api/leaderboardPublic/1",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      const json = await result.json();
      if (result.status === 200) {
        setIsLoaded(true);
        setTeams(json);
      } else {
        setIsLoaded(true);
        globalDispatch({
          type: "show error",
          payload: {
            title: json.message,
            icon: <IconX size={18} />,
            message: undefined,
          },
        });
      }
    };
    loadNumberOfPages();
    loadInitialPage();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full pt-32 justify-center">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col align-middle">
        <div className="flex flex-col align-middle pt-16 px-32 sm:px-28">
          <span className="text-3xl font-bold text-center">LEADERBOARD</span>
          <div className="grid grid-cols-4 gap-4 pt-8">
            <span className="text-2xl font-bold text-center">Team Name</span>
            <span className="text-2xl font-bold text-center">
              Points Earned
            </span>
            <span className="text-2xl font-bold text-center">Bonus</span>
            <span className="text-2xl font-bold text-center">Score</span>

            {teams.map((team) => (
              <>
                <span className="text-xl pl-16">
                  <Twemoji emoji={team.rank + ". " + team.username} />
                </span>
                <span className="text-xl text-center">{team.pointsEarned}</span>
                <span className="text-xl text-center">{team.bonus}</span>
                <span className="text-xl text-center">
                  {team.points} Points
                </span>
              </>
            ))}
          </div>

          <Pagination
            size="lg"
            total={numberOfPages}
            siblings={1}
            withEdges
            page={activePage}
            onChange={handlePagination}
            className="self-center py-10 border-none"
          />
        </div>
      </div>
    );
  }
};

export default Leaderboard;
