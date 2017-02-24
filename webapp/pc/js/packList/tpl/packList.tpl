<table class="table table-bordered index-table">
    <thead>
        <tr>
            <th>用户</th>
            <th>项目名称</th>
            <th>构建日期</th>
            <th>状态</th>
            <th>用时</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
    <% for(var i = 0; i < data.length; i++){ %>
        <tr>
            <td><%=data[i].user%></td>
            <td><%=data[i].name + ' #' + data[i].number%></td>
            <td><%=new Date(data[i].date).Format("yyyy-MM-dd hh:mm") %></td>
            <td><%=data[i].status%></td>
            <td><%=data[i].finishTime%>s</td>
            <td><a type="button" href="/#tab=logview&pro_id=<%=data[i]['id']%>&num=<%=data[i]['number']%>"  class="btn btn-info index-table-btn js-packlist-view" data-index="<%=i%>">查看</a
        </tr>
    <% } %>
    </tbody>
</table>
<div class="pack-log" style="display: none;">
    <div class="pack-log-content"></div>
    <button type="button" class="btn btn-info index-center-btn js-packlist-back">返回</button>
</div>
