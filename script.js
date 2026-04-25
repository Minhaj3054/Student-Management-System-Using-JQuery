$(document).ready(function(){
    let studentID = 0;

    // submit form
    $('#studentForm').submit(function(e){
        e.preventDefault();
        // get data from input fields
        let name = $('#name').val();
        let email = $('#email').val();
        let age = $('#age').val();
        let course = $('#course').val();
        let gender = $('input[name="gender"]:checked').val();
        let date = $('#date').val();

        let skills = [];
        $('.skills:checked').each(function(){
            skills.push($(this).val());
        })

        // simple validation
        if(name == "" || email == "" || course == "" || date == ""){
            $('#studentForm input, #studentForm select').filter(function(){
                return $(this).val() == "";
            }).addClass('error');
            return;
        }

        $('#studentForm input, #studentForm select').removeClass('error');

        studentID++;

        let row = `
            <tr data-id="${studentID}" data-status="Active" data-course="${course}" class="active">
                <td>${name}</td>
                <td>${email}</td>
                <td>${age}</td>
                <td>${course}</td>
                <td>${gender}</td>
                <td>${skills.join(" , ")}</td>
                <td>${date}</td>
                <td class="status">
                    <span class="badge toggle">Active</span>
                </td>
                <td style="display:flex">
                    <button class="edit">Edit</button>&nbsp
                    <button class="delete">Delete</button>
                </td>
            </tr>
        
        `;

        $('#studentTable').append(row);
        $('#studentTable tr:last').hide().fadeIn();
        $('#studentForm')[0].reset();

    })

    // row delete
    $(document).on('click', '.delete', function(){
        $(this).parent().parent().fadeOut(function(){
            $(this).remove();
        });
    })

    // toggle status
    $(document).on('click', '.toggle', function(){
        let row = $(this).closest("tr");

        if(row.attr('data-status') == "Active"){
            row.attr('data-status', "Inactive");
            row.find('.status').html("<span class='badge badge-danger toggle'>Inactive</span>")
            row.removeClass("active").addClass('inactive')
        }
        else{
            row.attr('data-status', "Active");
            row.find('.status').html("<span class='badge toggle'>Active</span>")
            row.removeClass("inactive").addClass('active')
        }
    })

    // edit row
    $(document).on('click', '.edit', function(){
        let row = $(this).closest('tr');
        $('#name').val(row.children().eq(0).text())
        $('#email').val(row.children().eq(1).text())
        $('#age').val(row.children().eq(2).text())
        $('#course').val(row.children().eq(3).text())
        $('#date').val(row.children().eq(6).text())
        // gender set
        let gender = row.children().eq(4).text();
        $("input[name='gender'][value='" + gender + "']").prop('checked', true);
        // skills set
        let skills = row.children().eq(5).text().split(", ");
        $(".skills").prop("checked", false);
        skills.forEach(skill => {
            $(".skills[value='" +skill+"']").prop('checked', true)
        });
    
        row.fadeOut(function(){
            $(this).remove();
        })
    });

    // searching
    $("#search").keyup(function(){
        let value = $(this).val().toLowerCase();

        $("#studentTable tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    })

    // course filter
    $('#filterCourse').change(function(){
        let value = $(this).val();

        $('#studentTable tr').each(function(){
            let course = $(this).attr("data-course");
            if(value === "" || value === course){
                $(this).fadeIn();
            }
            else{
                $(this).fadeOut();
            }
        });
    });

    // status filter
    $("#filterStatus").change(function(){
        let value = $(this).val();

        $("#studentTable tr").each(function(){
            let status = $(this).attr("data-status");
            if(value === "" || value === status){
                $(this).fadeIn();
            }
            else{
                $(this).fadeOut();
            }
        });
    });
});