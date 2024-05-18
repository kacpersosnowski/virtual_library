import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Pagination, TableBody, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { usersApi } from "../../config/api/users/users";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import StyledTable, {
  StyledTableCell,
  StyledTableRow,
} from "../Layout/common/StyledTable";
import DefaultAvatarOrProfilePicture from "./DefaultAvatarOrProfilePicture";
import { RootState } from "../../store/redux";
import usersMessages from "../../messages/usersMessages";

const UsersTable = () => {
  const { t } = useTranslation();
  const searchText = useSelector(
    (state: RootState) => state.search.searchText.searchUsers,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const {
    data: usersResponse,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: ["users", { page: currentPage, search: searchText }],
    queryFn: () => usersApi.getUsers({ page: currentPage, search: searchText }),
  });
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(0);
  }, [searchText]);

  const users = usersResponse?.content;
  const totalPages = usersResponse
    ? Math.ceil(usersResponse.totalElements / 10)
    : 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  if (isListLoading) {
    return <LoadingSpinner />;
  }

  if (isListError) {
    return (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  const heads = [
    t(usersMessages.usersTableNumberHeader.key),
    t(usersMessages.usersTableAvatarHeader.key),
    t(usersMessages.usersTableUsernameHeader.key),
    t(usersMessages.usersTableFirstNameHeader.key),
    t(usersMessages.usersTableLastNameHeader.key),
    t(usersMessages.usersTableProfileHeader.key),
  ];

  const tableBody = (
    <TableBody>
      {users.length === 0 && (
        <StyledTableRow>
          <StyledTableCell colSpan={heads.length} align="center">
            {t(usersMessages.usersTableNoUsers.key)}
          </StyledTableCell>
        </StyledTableRow>
      )}
      {users.map((user, index) => {
        return (
          <StyledTableRow key={user.id}>
            <StyledTableCell align="center">
              {index + 1 + 10 * currentPage}
            </StyledTableCell>
            <StyledTableCell align="center">
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <DefaultAvatarOrProfilePicture
                  user={user}
                  avatarSx={{
                    width: "3rem",
                    height: "3rem",
                    fontSize: "1.5rem",
                  }}
                  profilePictureSx={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "1.5rem",
                  }}
                />
              </Box>
            </StyledTableCell>
            <StyledTableCell align="center">{user.username}</StyledTableCell>
            <StyledTableCell align="center">{user.firstName}</StyledTableCell>
            <StyledTableCell align="center">{user.lastName}</StyledTableCell>
            <StyledTableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={t(usersMessages.usersTableProfileTooltip.key)}
                  arrow
                >
                  <IconButton onClick={() => navigate(`/user/${user.id}`)}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
  );
  return (
    <>
      <StyledTable heads={heads} body={tableBody} />;
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1rem",
        }}
      >
        {totalPages > 1 && (
          <Pagination
            color="secondary"
            count={totalPages}
            siblingCount={2}
            page={currentPage + 1}
            onChange={handlePageChange}
            disabled={totalPages <= 1}
          />
        )}
      </Box>
    </>
  );
};

export default UsersTable;
