<table class="table table-bordered index-table ">
    <thead>
        <tr>
            <th>项目名称</th>
            <th>上次成功</th>
            <th>上次失败</th>
            <th>用时</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
    <%console.log(new Date().Format);%>
    <% for(var i = 0; i < data.length; i++){%>
        <tr>
            <td><%=data[i].name%></td>
            <td><%=data[i].status == 'sucess' ? data[i].date : '无'%></td>
            <td><%=data[i].status == 'fail' ? data[i].date : '无'%></td>
            <td><%=data[i].finishTime%> </td>
            <td class="index-table-operate">
                <button type="button" class="btn btn-success index-table-btn js-btn-build">构建</button>
                <button type="button" class="btn btn-info index-table-btn">配置</button>
                <button type="button" class="btn btn-warning index-table-btn">回退</button>
            </td>
        </tr>
    <%}%>
        
       <!--   <tr>
            <td>日常版本20170201分支</td>
            <td>2016.1.23</td>
            <td>无</td>
            <td>13s</td>
            <td class="index-table-operate">
                <button type="button" class="btn btn-success index-table-btn js-btn-build">构建</button>
                <button type="button" class="btn btn-info index-table-btn">配置</button>
                <button type="button" class="btn btn-warning index-table-btn">回退</button>
            </td>
        </tr> -->
    </tbody>
</table>