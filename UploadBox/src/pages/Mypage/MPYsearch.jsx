import Introduce from '../components/Introduce.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Menu from '../components/Menu.jsx';
import Menu4 from '../components/Menu4.jsx'




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
      <div style={{ marginTop: "20px" }}>
        <Menu4 />
      </div>


    </div>
  )
}

export default Mypagehold;