# import tabula
# import pandas as pd
# # pdf_path = "IBVL BS 22-23.pdf"

# # dfs = tabula.read_pdf(pdf_path, pages='all')
# # # df=[]
# # # for i in range(len(dfs)):
# # #     dfs[i].to_csv('Balancesheet_data.csv', index=False)
# # existing_data = pd.DataFrame()    
# # new_data = pd.DataFrame(dfs)    
# # combined_data = pd.concat(['Balancesheet_data.xlsx', new_data], ignore_index=True)
# # with pd.ExcelWriter('Balancesheet_data.xlsx', engine='xlsxwriter', mode='a', if_sheet_exists='replace') as writer:
# #     combined_data.to_excel(writer, index=False, sheet_name='Sheet1')    

# # # df=pd.DataFrame(dfs)
# # # merged_list = sum([sublist for sublist in df], [])
# # # pd.DataFrame(dfs).to_excel('Balancesheet_data.xlsx', index=False)

# # # merged_list = sum([sublist for sublist in dfs], [])

# # import os
# # from tabula import wrapper
# # os.chdir("E:/Documents/myPy/")
# # tables = wrapper.read_pdf("IBVL BS 22-23.pdf",multiple_tables=True,pages='all',encoding='utf-8',spreadsheet=True)

# # i=1
# # for table in tables:
# #     table.columns = table.iloc[0]
# #     table = table.reindex(table.index.drop(0)).reset_index(drop=True)
# #     table.columns.name = None
# #     #To write Excel
# #     table.to_excel('output'+str(i)+'.xlsx',header=True,index=False)
# #     #To write CSV
# #     table.to_csv('output'+str(i)+'.csv',sep='|',header=True,index=False)
# #     i=i+1



# # Specify the path to your PDF file
# pdf_file_path = 'IBVL BS 22-23.pdf'
# output_excel_path = 'output_tables.xlsx'

# tables = tabula.read_pdf(pdf_file_path, pages='all', multiple_tables=True)

#     # Create a Pandas Excel writer
# excel_writer = pd.ExcelWriter(output_excel_path, engine='openpyxl')

#     # Iterate through tables and export them to Excel
# for i, table in enumerate(tables):
#     tbl = f'Table_{i + 1}'
#     tbl_len=+len(tbl)
#     table.to_excel(excel_writer, sheet_name="Data", index=False)

#     # Save the Excel file
# excel_writer.close()
import sys
import pandas as pd
import tabula

def append_table_to_excel(pdf_path, excel_path):
    # Read the existing Excel file if it exists

    try:
        existing_data = pd.read_excel(excel_path)
    except FileNotFoundError:
        # If the file doesn't exist, create an empty DataFrame
        existing_data = pd.DataFrame()

    # Extract tables from the PDF
    tables = tabula.read_pdf(pdf_path, pages='all', multiple_tables=True)

    # Iterate through tables and append them to the existing data
    for i, table in enumerate(tables):
        if not existing_data.empty:
            # Append the table to the existing data
            existing_data = pd.concat([existing_data, table], ignore_index=True)
        else:
            # If there is no existing data, use the table directly
            existing_data = table

    # Write the combined data to the Excel file
    existing_data.to_excel(excel_path, index=False)
    return True

# Specify the path to your PDF file
'''pdf_file_path = 'uploads\\uploaded_file.pdf'

# Specify the path for the output Excel file
output_excel_path = 'output\\output_tables2.xlsx'

# Call the function to extract and append tables to Excel
append_table_to_excel(pdf_file_path, output_excel_path)
if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: python script.py <pdf_file_path>')
        sys.exit(1)

    pdf_file_path = sys.argv[1]
    output_excel_path = 'output_tables.xlsx'

    append_table_to_excel(pdf_file_path, output_excel_path)'''