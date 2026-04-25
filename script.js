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

})