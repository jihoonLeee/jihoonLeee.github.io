import React, { useState, useEffect ,useContext} from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom'; 
import axios from 'axios'; 

const theme = createTheme({
    palette: {
      primary: lime,
      secondary: {
        main:'#F43F5E',
        head : '#d5bbb9'
      },
    },
  });
export default function DogBoard() {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.head,
      color: theme.palette.common.black,
      textAlign: 'center',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      
    },
    '&:nth-of-type(1)': {
      width: '67%',
    },
    '&:nth-of-type(2)': {
      width: '13%',
    },
    '&:nth-of-type(3)': {
      width: '10%',
    },
    '&:nth-of-type(4)': {
      width: '5%',
    },
    '&:nth-of-type(5)': {
      width: '5%',
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
    const [posts, setPosts] = useState([]);
      
    useEffect(() => {
      axios.get('/posts/list') 
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <main className="flex flex-col items-center px-4 md:px-6 dark:bg-rose-900 min-h-screen">
        <section className="w-full max-w-5xl mt-8 bg-white dark:bg-rose-950 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-rose-900 dark:text-rose-50">정보 공유</h2>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="secondary" component={Link} to="/boardWrite">
                  <span className="text-sm font-semibold leading-6 text-gray-900 no-underline">글쓰기</span>
                </Button>
              </ThemeProvider>
            </div>
            <div className="flex items-center mb-4">
           
            </div>
            <hr className="my-4 border-rose-200 dark:border-rose-800" />

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>제목</StyledTableCell>
                    <StyledTableCell align="right">닉네임</StyledTableCell>
                    <StyledTableCell align="right">날짜</StyledTableCell>
                    <StyledTableCell align="right">조회수</StyledTableCell>
                    <StyledTableCell align="right">따봉</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {posts.map((post) => (
                  <StyledTableRow key={post.postId}>
                  
                    <StyledTableCell component="th" scope="row">
                      <Link to={`/post/${post.postId}`}>
                        {post.title}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">{post.nickName}</StyledTableCell>
                    <StyledTableCell align="right">{formatDate(post.regDate)}</StyledTableCell>
                    <StyledTableCell align="right">{post.visitCnt}</StyledTableCell>
                    <StyledTableCell align="right">{post.likeCnt}</StyledTableCell>
                  </StyledTableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex justify-between mt-4">
            {/* <ThemeProvider theme={theme}>
                <ButtonGroup variant="contained" color="secondary" aria-label="outlined primary button group">
                <Button variant="contained" color="secondary">이전</Button>
                <Button variant="contained" color="secondary">1</Button>
                <Button variant="contained" color="secondary">2</Button>
                <Button variant="contained" color="secondary">3</Button>
                <Button variant="contained" color="secondary">다음</Button>
                </ButtonGroup>
            </ThemeProvider> */}
   
           <ThemeProvider theme={theme}>
           <div className="flex border rounded h-9">
            <input className="p-2 flex-grow w-28" type="text" placeholder="검색하세요" />
            <Button className="bg-blue-500 text-white p-2 rounded-r" color="secondary">검색</Button>
          </div>
           </ThemeProvider>
           </div>
            <div className="flex justify-between mt-4">
              <div className="flex justify-center flex-grow">
              <Pagination count={10} variant="outlined" shape="rounded" />
            </div>
            </div>
          </div>
        </section>
      </main>
    );
}

function formatDate(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();

  let formattedDate;

  if (inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear()) {
    // 같은 날짜인 경우
    formattedDate = `${inputDate.getHours()}:${inputDate.getMinutes()}`;
  } else {
    // 다른 날짜인 경우
    formattedDate = `${inputDate.getFullYear()}.${inputDate.getMonth()+1}.${inputDate.getDate()} ${inputDate.getHours()}:${inputDate.getMinutes()}`;
  }

  return formattedDate;
}