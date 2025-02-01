import Introduce from '../../components/Mypg/Introduce.jsx';
import SearchBar from '../../components/Mypg/SearchBar.jsx';
import Menu from '../../components/Mypg/Menu.jsx';
import Menu1 from '../../components/Mypg/Menu1.jsx'
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
      <div style={{ marginTop: "20px"  }}>
        <Menu1 />

      </div>


    </div>
    </div>
  )
}

export default Mypagehold;