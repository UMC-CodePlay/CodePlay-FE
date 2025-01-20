import Introduce from '../components/Introduce.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Menu from '../components/Menu.jsx';




function Mypagehold() {
  return (
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
  )
}

export default Mypagehold;