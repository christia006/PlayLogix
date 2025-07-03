export default function useGetJWT() {
  const jwtToken = localStorage.getItem("gameVerse-token");
  if (!jwtToken) {
    return null;
  }

  return jwtToken;
}
