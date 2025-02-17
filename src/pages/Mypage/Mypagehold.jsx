import Introduce from '../../components/Mypg/Introduce.jsx';
import SearchBar from '../../components/Mypg/SearchBarentire.jsx';
import Menu from '../../components/Mypg/Menu.jsx';
import NavbarLog from '../../components/Mypg/NavbarLog.jsx';
import Mypageletter from '../../components/Mypg/Mypageletter.jsx';





function Mypagehold() {
  return (
    <div>
      <NavbarLog/>
      <Mypageletter/>
    <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
      
      <Introduce/>
      
      
      {/* 검색 바 */}
      <div style={{ borderBottom: "1px solid #E4E1E7" }}>
        <SearchBar />
      </div>

      {/* 상단 메뉴 */}
      <div style={{ borderBottom: "1px solid #E4E1E7" }}>
        <Menu />
      </div>
    </div>

    </div>
  )
}

export default Mypagehold;