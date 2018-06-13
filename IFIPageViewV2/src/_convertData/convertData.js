// Convert về dạng đích
export default function convertData(data, ArrayHeader, ArrayColumn, IndexId) {
  const tableData = {
    headerCol : [...ArrayHeader],//Dữ liệu cho header của table
    columns:test(ArrayColumn),//Lọc dữ liệu columns
    rows:Object.values(data),//Dữ liệu cho body
    indexId: IndexId // Id phục vụ cho sửa xóa
  }
  return tableData;
}

function test (item){
  const a = [];
  for(var i=0;i<item.length;i++)

    a.push(
      
      item[i]
    
    
    );
  return a;
}