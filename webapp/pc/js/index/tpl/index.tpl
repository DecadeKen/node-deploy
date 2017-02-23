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
    <% for(var i = data.length-1; i >= 0; i--){%>
        <tr>
            <td><%=data[i].name%></td>
            <td><%=data[i].status == 'sucess' ? new Date(data[i].date).Format("yyyy-MM-dd hh:mm") : '无'%></td>
            <td><%=data[i].status == 'fail' ? new Date(data[i].date).Format("yyyy-MM-dd hh:mm") : '无'%></td>
            <td><%=data[i].finishTime%>s </td>
            <td class="index-table-operate" data-id=<%=data[i].id%> data-number=<%=data[i].number%> >
                <button type="button" class="btn btn-success index-table-btn js-btn-build">构建</button>
                <button type="button" class="btn btn-info index-table-btn js-btn-delete">删除</button>
                <button type="button" class="btn btn-warning index-table-btn js-btn-rollback">回退</button>
            </td>
        </tr>
    <%}%>

    </tbody>
</table>